import { procedure } from '../config/db';

class Base {
    protected PREFIX = 'sp';
    protected SQL_GET = `${this.PREFIX}Get`;
    protected SQL_INSERT = `${this.PREFIX}Insert`;
    protected SQL_UPDATE = `${this.PREFIX}Update`;
    protected SQL_DELETE = `${this.PREFIX}Delete`;

    rowsets(procedureName: string, args: Array<any> = []): Promise<Array<Array<any>>> {
        return procedure(procedureName, args);
    };
    
    rows(procedureName: string, args: Array<any> = []): Promise<Array<Array<any>>> {
        return this.rowsets(procedureName, args)
            .then((rowsets: Array<Array<any>>) => {
                return rowsets[0];
            });
    };
    
    row(procedureName: string, args: Array<any> = []): Promise<Array<any>> {
        return this.rows(procedureName, args)
            .then((rows: Array<any>) => {
                return rows[0];
            });
    };
    
    single(procedureName: string, args: Array<any> = []): Promise<any> {
        return this.row(procedureName, args)
            .then((row: any) => {
                return row[0];
            });
    };
    
    empty(procedureName: string, args: Array<any> = []): Promise<void> {
        return this.rowsets(procedureName, args)
            .then(() => {
                return;
            });
    };
}

export default Base;