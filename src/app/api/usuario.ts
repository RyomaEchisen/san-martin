import { Evento } from './evento';
import { Funcionario } from './funcionario';
import { Rol } from './rol';

export interface Usuario {
    id: number;
    username: string;
    password: string;
    enabled: boolean;
    email: string;
    roles: any;
    funcionario: Funcionario;
    eventos: Array<Evento>;
    cargo: String;

    [index: string]: any;
    avatar?: string;
}
