function isValidEmail(email) {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Test the email against the regex
    return emailRegex.test(email);
  }
  
  // Example usage:
  const emailToCheck = "test@example.com";
  if (isValidEmail(emailToCheck)) {
    console.log(`${emailToCheck} is a valid email address.`);
  } else {
    console.log(`${emailToCheck} is not a valid email address.`);
  }
  