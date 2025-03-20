export const searchExoplanets = (exoplanets, pattern) => {
    return exoplanets.filter(planet => planet.name.indexOf(pattern) != -1)
}