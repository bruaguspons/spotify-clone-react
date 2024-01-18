import { type Observable, Subject } from 'rxjs';

class SubjectManager<T> {
    private readonly subject$ = new Subject<T>();

    getSubject(): Observable<T> {
        return this.subject$.asObservable();
    }

    setSubject(value: T): void {
        this.subject$.next(value);
    }
}

export default SubjectManager;
