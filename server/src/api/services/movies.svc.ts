import crud from './base.svc';

const base = crud('movie');

const read = (id: number): Promise<any> => {
    return base.get(`${id}`);
};

const search = (term: string): Promise<any> => {
    return base.get('search', {
        query: term.replace(' ',  '-')
    });
};

export default {
    read,
    search
};