import 'reflect-metadata';
import {Container} from "inversify";

type InjectableClass<T> = new (...args: any[]) => T;

export function containerHandler(providers: InjectableClass<any>[]) {
    const container: Container = new Container();
    providers.forEach(item => {
        container.bind<typeof item>(item).to(item);
    });
    return container;
}
