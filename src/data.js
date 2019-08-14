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
        'mo': Boolean(Math.round(Math.random() * 0.6)),
        'tu': Boolean(Math.round(Math.random() * 0.6)),
        'we': Boolean(Math.round(Math.random() * 0.6)),
        'th': Boolean(Math.round(Math.random() * 0.6)),
        'fr': Boolean(Math.round(Math.random() * 0.6)),
        'sa': Boolean(Math.round(Math.random() * 0.6)),
        'su': Boolean(Math.round(Math.random() * 0.6)),
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
  for (const fil of filters) {
    result.push({
      title: fil.title,
      count: tasks.filter((arg) => fil.callback(arg)).length
    });
  }
  return result;
};
