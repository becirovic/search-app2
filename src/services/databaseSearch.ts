export const databaseSearch = async search =>
    await fetch(
        `https://mmp.acdh-dev.oeaw.ac.at/api/stelle/?limit=20&zitat=${search}&zitat_lookup=icontains`
    ).then(val => val.json());