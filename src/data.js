const boolRandom = () => Boolean(Math.round(Math.random() * 0.6));

export const getTask = (count = 1) => {
  let result = [];
  while (result.length < count) {
    result.push({
      description: [
        `Изучить теорию`,
        `Сделать домашку`,
        `Пройти интенсив на соточку`,
      ][Math.floor(Math.random() * 3)],
      dueDate: Date.now() + 1 + Math.ceil(Math.random() * 7 * 1000) * 24 * 60 * 60,
      tags: new Set([
        `homework`,
        `theory`,
        `practice`,
        `intensive`,
        `keks`,
      ].filter(()=>Boolean(Math.round(Math.random())))),
      repeatingDays: {
        'mo': boolRandom(),
        'tu': boolRandom(),
        'we': boolRandom(),
        'th': boolRandom(),
        'fr': boolRandom(),
        'sa': boolRandom(),
        'su': boolRandom(),
      },
      color: [
        `black`,
        `yellow`,
        `blue`,
        `green`,
        `pink`,
      ][Math.floor(Math.random() * 5)],
      isFavorive: Boolean(Math.round(Math.random())),
      isArchive: Boolean(Math.round(Math.random())),
    });
  }
  return result;
};

const filters = [
  {title: `ALL`, callback: () => true},
  {title: `OVERDUE`, callback: ({dueDate}) => dueDate < Date.now()},
  {title: `TODAY`, callback: ({dueDate}) => dueDate === Date.now()},
  {title: `FAVORITES`, callback: (isFavorive) => isFavorive},
  {title: `REPEATING`, callback: ({repeatingDays}) => Object.values(repeatingDays).find((val) => val === true)},
  {title: `TAGS`, callback: ({tags}) => Array.from(tags).length > 0},
  {title: `ARCHIVE`, callback: ({isArchive}) => isArchive},
];

export const calcFilters = (tasks) => {
  let result = [];
  console.log(tasks);
  for (const filter of filters) {
    result.push({
      title: filter.title,
      count: tasks.filter((arg) => filter.callback(arg)).length
    });
  }
  return result;
};
