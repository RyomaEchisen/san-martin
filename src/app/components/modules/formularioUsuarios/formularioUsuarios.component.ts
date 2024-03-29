import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormularioUsuario } from 'src/app/api/formularioUsuario';
import { FormularioService } from 'src/app/services/formulario.service';

////
import jsPDF from 'jspdf';
import 'jspdf/dist/polyfills.es.js';
import html2canvas from 'html2canvas';
import { UsuarioService } from 'src/app/services/usuario.service';

export interface PeriodicElement {
    position: number;
    name: string;
    tipo: string;
    estado: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        position: 1,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 2,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 3,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 4,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 5,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 6,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 7,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 8,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 9,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
    {
        position: 10,
        name: 'Solicitud pendiente',
        tipo: 'Solicitud Pendiente',
        estado: 'pendiente',
    },
];
@Component({
    selector: 'tab-group-basic-example',
    templateUrl: './formularioUsuarios.component.html',

    styleUrls: ['formularioUsuarios-routing.css'],
    providers: [MessageService],
})
export class FormularioUsuariosComponent implements OnInit {
    formularioUsuarioDialog: boolean = false;

    deleteFormularioUsuarioDialog: boolean = false;

    deleteFormularioUsuarioesDialog: boolean = false;

    formularioUsuarioes: FormularioUsuario[] = [];

    formularioUsuario: Partial<FormularioUsuario> = {};

    selectedFormularioUsuarioes: FormularioUsuario[] = [];

    submitted: boolean = false;

    cols: Array<{
        field: string;
        header: string;
    }> = [];

    cols2: Array<{
        field2: string;
        header2: string;
    }> = [];
    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    displayedColumns: string[] = ['position', 'name', 'tipo', 'estado'];
    dataSource = ELEMENT_DATA;

    items: MenuItem[] = [];

    cardMenu: MenuItem[] = [];
    formularioDialog: Boolean = false;
    printDialog: Boolean = false;
    formularioDialog2: [] = [];
    //formularioUsuario: Partial<FormularioUsuario> = {};
    formularioUsuarios: FormularioUsuario[] = [];

    //submitted: boolean = false;

    /* cols: Array<{
        field: string;
        header: string;
    }> = [];*/

    //statuses: any[] = [];

    //rowsPerPageOptions = [5, 10, 20];
    @ViewChild('htmlData') htmlData!: ElementRef;

    constructor(
        private formularioUsuarioService: FormularioService,
        private messageService: MessageService,
        private usuarioService: UsuarioService
    ) {}
    getFormularioUsuarios() {
        this.formularioUsuarioService.get().subscribe({
            next: (response) => {
                this.formularioUsuarios = response;
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error!',
                    detail: `Error al conectarse al servidor.`,
                    life: 3000,
                });
                // console.log('error en servicio conexión back', err);
            },
        });
    }
    /*constructor(
        private formularioUsuarioService: FormularioService,
        private messageService: MessageService,
    ) {}
*/

    ngOnInit() {
        this.getFormularioUsuarios();
        this.items = [
            {
                label: 'Angular.io',
                icon: 'pi pi-external-link',
                url: 'http://angular.io',
            },
            {
                label: 'Theming',
                icon: 'pi pi-bookmark',
                routerLink: ['/theming'],
            },
        ];

        this.cardMenu = [
            {
                label: 'Save',
                icon: 'pi pi-fw pi-check',
            },
            {
                label: 'Update',
                icon: 'pi pi-fw pi-refresh',
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-trash',
            },
        ];
        // this.getFormularioUsuarios();
        this.cols = [
            { field: 'nombre', header: 'Nombre Formulario' },
            { field: 'tipoF', header: 'Tipo' },
            { field: 'cargo', header: 'Cargo' },
            { field: 'motivo', header: 'Motivo' },
            { field: 'fecha', header: 'Fecha' },
            { field: 'deHora', header: 'De Horas' },
            { field: 'aHora', header: 'A Horas' },
            { field: 'usuario', header: 'Usuario' },
        ];

        //this.formularioDialog2= [ 'dialog1','dialog2'];

        this.statuses = [
            { label: 'ACTIVO', value: true },
            { label: 'INACTIVO', value: false },
        ];
    }
    openNew(dato: string) {
        this.formularioUsuario = {};
        this.formularioUsuario.tipoF = dato;
        this.submitted = false;
        this.formularioDialog = true;
        this.formularioUsuario.usuario = this.usuarioService.getUser();
        this.formularioUsuario.nombre = this.usuarioService.getUser().username;
        this.formularioUsuario.cargo = this.usuarioService.getUser().cargo;

        console.log('asi');
        console.log(this.usuarioService.getUser().username);
    }

    /*openNew2(int: number) {
        this.formularioUsuario = {};
        this.submitted = false;
        //  this.formularioDialog2[int] = true;
        console.log(this.formularioDialog2, +'formularios');
    }*/

    hideDialog() {
        this.formularioDialog = false;
        this.submitted = false;
    }

    saveFormularioUsuario() {
        this.submitted = true;
        console.log('HOLA' + this.formularioUsuario.tipoF);
        if (this.formularioUsuario.nombre?.trim()) {
            if (this.formularioUsuario.id) {
                // @ts-ignore
                // TODO: interactuar con back
                this.formularioUsuarioService
                    .update(this.formularioUsuario.id, {
                        ...this.formularioUsuario,
                    })
                    .subscribe({
                        next: (response) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Actualizado!',
                                detail: 'Formulario actualizada exitosamente',
                                life: 3000,
                            });
                            this.getFormularioUsuarios();
                        },
                        error: (err) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error!',
                                detail: 'Error al actualizar la formularioUsuario.',
                                life: 3000,
                            });
                        },
                    });
            } else {
                this.formularioUsuarioService
                    .create({
                        ...this.formularioUsuario,
                    })

                    .subscribe({
                        next: (response) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Registrado!',
                                detail: 'Formulario registrada exitosamente',
                                life: 3000,
                            });
                            this.getFormularioUsuarios();
                        },
                        error: (err) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error!',
                                detail: 'Error al registrar la formularioUsuario.',
                                life: 3000,
                            });
                        },
                    });
                console.log(
                    'formularioUsuarioService' + this.formularioUsuario
                );
            }

            // this.formularioUsuarios = [...this.formularioUsuarios];
            this.formularioDialog = false;

            this.formularioUsuario = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    editFormularioUsuario(formularioUsuario: FormularioUsuario) {
        this.formularioUsuario = { ...formularioUsuario };
        this.formularioDialog = true;
    }

    ImprimirForm(formularioUsuario: FormularioUsuario) {
        this.formularioUsuario = { ...formularioUsuario };
        this.formularioDialog = true;
    }
    //public openPDF(): void {

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.formularioUsuarios.length; i++) {
            if (this.formularioUsuarios[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
    VerForm(formularioUsuario: FormularioUsuario) {
        this.formularioUsuario = { ...formularioUsuario };
        this.printDialog = true;
    }
    hideVerDialog() {
        this.printDialog = false;
        //this.submitted = false;
    }
    makePdf() {
        let DATA: any = document.getElementById('htmlData');
        html2canvas(DATA).then((canvas) => {
            let fileWidth = 208;
            let fileHeight = (canvas.height * fileWidth) / canvas.width;
            const FILEURI = canvas.toDataURL('image/png');
            let PDF = new jsPDF('p', 'mm', 'a4');
            let position = 0;
            PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
            // window.open(PDF.output('bloburl'));
            PDF.save('angular-demo.pdf');
        });
    }
}
