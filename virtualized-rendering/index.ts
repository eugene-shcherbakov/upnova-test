// Type definitions
type ListItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

type PositionedItem = ListItem & {
  top: number;
};

type ListState = {
  itemsData: ListItem[];
  visibleItems: PositionedItem[];
  scrollTop: number;
  containerHeight: number;
  observer: IntersectionObserver | null;
};

// Configuration constants
const CONFIG = {
  TOTAL_ITEMS: 10000,
  ITEM_HEIGHT: 200, // pixels
  BUFFER_SIZE: 5, // items above and below visible area
  CONTAINER_ID: 'list-container',
  SPACER_ID: 'list-spacer',
} as const;

// Initialize data
function initializeData(): ListItem[] {
  return Array.from({ length: CONFIG.TOTAL_ITEMS }, (_, index) => ({
    id: index,
    title: `Item ${index + 1}`,
    description: `This is the description for item ${index + 1}. It contains some details about the item.`,
    imageUrl: `https://picsum.photos/id/${(index % 1000) + 1}/300/200`,
  }));
}

// Utility function to compare arrays for equality
function arraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// Calculate which items should be visible based on scroll position
function calculateVisibleItems(
  state: ListState,
  container: HTMLElement
): { newState: Pick<ListState, 'visibleItems' | 'scrollTop'>; changed: boolean } {
  const scrollTop = container.scrollTop;

  // Calculate start and end indices with buffer
  const startIndex = Math.max(0, Math.floor(scrollTop / CONFIG.ITEM_HEIGHT) - CONFIG.BUFFER_SIZE);
  const endIndex = Math.min(
    CONFIG.TOTAL_ITEMS - 1,
    Math.ceil((scrollTop + state.containerHeight) / CONFIG.ITEM_HEIGHT) + CONFIG.BUFFER_SIZE
  );

  // Create new array of visible items
  const newVisibleItems: PositionedItem[] = [];
  for (let i = startIndex; i <= endIndex; i++) {
    newVisibleItems.push({
      ...state.itemsData[i],
      top: i * CONFIG.ITEM_HEIGHT,
    });
  }

  // Check if items have changed
  const changed = !arraysEqual(
    state.visibleItems.map(item => item.id),
    newVisibleItems.map(item => item.id)
  );

  return {
    newState: {
      visibleItems: newVisibleItems,
      scrollTop,
    },
    changed,
  };
}

// Create a DOM element for an item
function createItemElement(item: PositionedItem): HTMLElement {
  const el = document.createElement('div');
  el.className = 'list-item';
  el.dataset.id = item.id.toString();
  el.style.top = `${item.top}px`;
  el.style.height = `${CONFIG.ITEM_HEIGHT}px`;

  el.innerHTML = `
        <div class="item-image-container">
            <div class="image-placeholder"></div>
            <img 
                class="item-image" 
                data-src="${item.imageUrl}" 
                data-id="${item.id}" 
                alt="Image for ${item.title}" 
            />
        </div>
        <div class="item-content">
            <div class="item-title">${item.title}</div>
            <div class="item-description">${item.description}</div>
        </div>
    `;

  return el;
}

// Render visible items in the container
function renderItems(container: HTMLElement, visibleItems: PositionedItem[]): void {
  // Get currently rendered items
  const existingItems = Array.from(container.querySelectorAll('.list-item')) as HTMLElement[];

  const existingItemIds = existingItems.map(el => parseInt(el.dataset.id || '-1', 10));

  // Find items to add and remove
  const itemsToAdd = visibleItems.filter(item => !existingItemIds.includes(item.id));

  const itemsToRemove = existingItems.filter(el => {
    const id = parseInt(el.dataset.id || '-1', 10);
    return !visibleItems.some(item => item.id === id);
  });

  // Remove items that are no longer visible
  itemsToRemove.forEach(el => {
    container.removeChild(el);
  });

  // Add new visible items
  itemsToAdd.forEach(item => {
    const itemElement = createItemElement(item);
    container.appendChild(itemElement);
  });
}

// Setup intersection observer for lazy loading images
function setupIntersectionObserver(
  container: HTMLElement,
  prevObserver: IntersectionObserver | null
): IntersectionObserver {
  // Clean up existing observer if any
  if (prevObserver) {
    prevObserver.disconnect();
  }

  // Create new observer
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;

          if (src) {
            // Start loading the image
            img.src = src;

            // When the image loads, show it and hide the placeholder
            img.onload = () => {
              img.classList.add('loaded');
              const placeholder = img.previousElementSibling as HTMLElement;
              if (placeholder && placeholder.classList.contains('image-placeholder')) {
                placeholder.style.display = 'none';
              }
            };

            // Remove the data-src attribute to prevent loading it again
            img.removeAttribute('data-src');

            // Stop observing this image
            observer.unobserve(img);
          }
        }
      });
    },
    {
      root: container,
      rootMargin: '200px 0px', // Start loading images before they enter the viewport
      threshold: 0.1,
    }
  );

  // Observe all images with data-src
  const images = document.querySelectorAll('.item-image[data-src]');
  images.forEach(img => {
    observer.observe(img);
  });

  return observer;
}

// Expose some data for debugging
interface Window {
  listDebug?: {
    state: ListState;
    config: typeof CONFIG;
    getPerformanceStats: () => {
      renderedItems: number;
      firstVisibleIndex: number;
      lastVisibleIndex: number;
      scrollPosition: number;
    };
  };
}

// Initialize the virtualized list
function initVirtualizedList(): void {
  // Get DOM elements
  const container = document.getElementById(CONFIG.CONTAINER_ID) as HTMLElement;
  const spacer = document.getElementById(CONFIG.SPACER_ID) as HTMLElement;

  if (!container || !spacer) {
    throw new Error('Required DOM elements not found');
  }

  // Initialize state
  let state: ListState = {
    itemsData: initializeData(),
    visibleItems: [],
    scrollTop: 0,
    containerHeight: container.clientHeight,
    observer: null,
  };

  // Expose debugging information
  (window as any).listDebug = {
    state,
    config: CONFIG,
    getPerformanceStats: () => ({
      renderedItems: state.visibleItems.length,
      firstVisibleIndex: state.visibleItems.length > 0 ? state.visibleItems[0].id : -1,
      lastVisibleIndex:
        state.visibleItems.length > 0 ? state.visibleItems[state.visibleItems.length - 1].id : -1,
      scrollPosition: state.scrollTop,
    }),
  };

  // Set the spacer height to create scrollable area
  spacer.style.height = `${CONFIG.TOTAL_ITEMS * CONFIG.ITEM_HEIGHT}px`;

  // Update visible items and render
  const { newState, changed } = calculateVisibleItems(state, container);
  state = { ...state, ...newState };

  if (changed) {
    renderItems(container, state.visibleItems);
    state.observer = setupIntersectionObserver(container, state.observer);
  }

  // Handle scroll events
  const handleScroll = (): void => {
    const { newState, changed } = calculateVisibleItems(state, container);
    state = { ...state, ...newState };

    if (changed) {
      renderItems(container, state.visibleItems);
      state.observer = setupIntersectionObserver(container, state.observer);
    }
  };

  // Handle window resize
  const handleResize = (): void => {
    state.containerHeight = container.clientHeight;
    const { newState, changed } = calculateVisibleItems(state, container);
    state = { ...state, ...newState };

    if (changed) {
      renderItems(container, state.visibleItems);
      state.observer = setupIntersectionObserver(container, state.observer);
    }
  };

  // Set up event listeners
  container.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
}

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', initVirtualizedList);
