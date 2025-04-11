export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email); 
}
  
  export function validatePassword(password) {
    return password.length >= 6;
  }
  
  export function validateEventData(eventData) {
    return (
      eventData.title &&
      eventData.description &&
      eventData.date &&
      eventData.location
    );
  }