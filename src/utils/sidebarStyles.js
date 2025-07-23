/**
 * Helper function to get responsive sidebar styles
 * @returns {Object} CSS styles object for sidebar
 */
export const getSidebarStyles = () => {
  // Check if we're on a small screen (xs)
  const isSmallScreen = window.innerWidth < 768; // Bootstrap md breakpoint

  if (isSmallScreen) {
    return {}; // No sticky positioning on small screens
  }

  return {
    position: "sticky",
    top: "20px",
    height: "fit-content",
    maxHeight: "calc(100vh - 40px)",
    overflowY: "auto",
  };
};
