export const filterMarkup = (filters) => `<section class="main__filter filter container">
${Array.from(filters).map(({title, count}) => `<input
type="radio"
id="filter__${title.toLowerCase()}"
class="filter__input visually-hidden"
name="filter"
checked
/>
<label for="filter__${title.toLowerCase()}" class="filter__label">
${title} <span class="filter__${title.toLowerCase()}-count">${count}</span></label
>`)}
</label
></section>`;
