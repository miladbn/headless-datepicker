import {
  useState,
  useCallback,
  KeyboardEvent as ReactKeyboardEvent,
} from 'react';

/**
 * A custom hook to manage keyboard navigation for a date picker.
 *
 * @param {Date} initialDate - The initial date that will be focused when the date picker is rendered.
 * @returns {Object} The result object containing the focused date and the handleKeyDown function.
 * @returns {Date} result.focusedDate - The currently focused date based on keyboard navigation.
 * @returns {function} result.handleKeyDown - A function to handle keyboard events and update the focused date.
 *
 * @example
 * const { focusedDate, handleKeyDown } = useDatePickerNavigation(new Date());
 *
 * return (
 *   <div tabIndex={0} onKeyDown={handleKeyDown} role="grid">
 *     {focusedDate.toDateString()}
 *   </div>
 * );
 */
function useDatePickerNavigation(initialDate: Date) {
  const [focusedDate, setFocusedDate] = useState<Date>(initialDate);

  /**
   * Handles keyboard events to navigate through dates in the date picker.
   *
   * @param {ReactKeyboardEvent<HTMLDivElement>} event - The keyboard event triggered by user interaction.
   * @returns {Date|null} The focused date if the Enter or Space key is pressed, otherwise null.
   */
  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>): Date | null => {
      const newFocusedDate = new Date(focusedDate);

      switch (event.key) {
        case 'ArrowLeft':
          newFocusedDate.setDate(focusedDate.getDate() - 1);
          break;
        case 'ArrowRight':
          newFocusedDate.setDate(focusedDate.getDate() + 1);
          break;
        case 'ArrowUp':
          newFocusedDate.setDate(focusedDate.getDate() - 7);
          break;
        case 'ArrowDown':
          newFocusedDate.setDate(focusedDate.getDate() + 7);
          break;
        case 'Enter':
        case ' ':
          return focusedDate; // Return the focused date if Enter or Space is pressed
        case 'Escape':
          // Optionally handle picker close (not implemented in this hook)
          return null;
        default:
          return null;
      }

      event.preventDefault();
      setFocusedDate(newFocusedDate);
      return null;
    },
    [focusedDate],
  );

  return {
    focusedDate,
    handleKeyDown,
  };
}

export default useDatePickerNavigation;
