export const FileSizeToString = (item: number) => {
  return item / 1000 < 1000
    ? `${Math.trunc(item / 1000)} Kb.`
    : item / 1000 < 1000000
      ? `${(item / 1000000).toFixed(2)} Mb.`
      : `${(item / 1000000000).toFixed(2)} Gb.`
}
