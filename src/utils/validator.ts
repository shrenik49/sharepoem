export function validateFields(obj: any, requiredFields: string[]) {
  for (const field of requiredFields) {
    if (!obj[field]) {
      return `${field} is required`;
    }
  }
  return null;
}
