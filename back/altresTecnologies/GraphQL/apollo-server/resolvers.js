import fs from 'fs';

const movies = [];
const directors = [];

const resolvers = {
    Query: {
        movies: () => movies,
        movie: (_, { id }) => movies.find(movie => movie.id == id),
        directors: () => directors,
    },
    Movie: {
        director: (parent) => {
            const director = directors.find(director => director.id == parent.directorId);
            if (!director) {
                throw new Error('Director no trobat');
            }
            return director;
        }
    },
    Mutation: {
        addMovie: ( parent, { title, year, directorId }) => {
            const director = directors.find(director => director.id == directorId);
            if (!director) {
                throw new Error('Director no trobat');
            }
            
            const newMovie = { id: generateUniqueId(), title, year, directorId };
            movies.push(newMovie);
            storeData();

            return newMovie;
        },

        addDirector: (_, { name }) => {
            const newDirector = { id: String(directors.length + 1), name };
            directors.push(newDirector);
            return newDirector;
        },
    },
};

const fetchData = () => {
    try {
        const jsonData = fs.readFileSync('./movies.json', 'utf-8');
        const data = JSON.parse(jsonData);

        movies.push(...data.movies);
        directors.push(...data.directors);
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
};

function storeData() {
    const data = {
        movies,
        directors,
    };
    fs.writeFileSync('./movies.json', JSON.stringify(data, null, 2), 'utf-8');
}

function generateUniqueId() {
    return String(movies.length + 1);
}

fetchData();

export default resolvers;
