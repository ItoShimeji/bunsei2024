export default async function templateLoder(url, selector) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load template: ${url}`);
    }
    const html = await response.text();
    const container = document.querySelector(selector);
    if (container) {
      container.innerHTML = html;
    }
  } catch (error) {
    console.error(error);
  }
}
