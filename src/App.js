import logo from './resources/perro.png';
import form from './resources/form.png';
import user from './resources/users.png';
import muchacho from './resources/muchacho.png';
import './App.css';
import { Request } from './components/Request';
import { Divider } from './components/Divider';
import { Component } from "react";
import { UserService } from "./service/userService";
import { BookingService } from "./service/bookingService";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';

export default class App extends Component{

    constructor(){
        super();
        this.state = {
          visible : false,
          booking : {
            bookingId : null,
            userName : null,
            petId : null,
            userDateCreated : null
          }
        };
        this.items = [
          {
            label: '¡Nuevo registro de mascota!',
            icon: 'pi pi-fw pi-plus',
            command : () => {this.showSaveDialog()}
          }
        ];
        this.userService = new UserService();
        this.bookingService = new BookingService();
        this.save = this.save.bind(this);
        this.footer = (
          <div>
            <Button label="Guardar..." icon="pi pi-check" onClick={this.save} />
          </div>
        )
    }

    componentDidMount(){
        this.userService.getAll().then(data => this.setState({users: data}))
        this.bookingService.getAll().then(data => this.setState({bookings: data}))
    }

    save(){
      this.bookingService.save(this.state.persona).then(data => {
        this.setState({
          visible : false,
          booking : {
            bookingId : null,
            userName : null,
            petId : null,
            userDateCreated : null
          }
        });
        this.growl.show({severity: 'success', summary: 'Atento...', detail: 'Se guardó el registro correctamente.'});
      this.bookingService.getAll().then(data => this.setState({bookings: data}))
      })
    }

    render(){
        return (
            <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        ¡Bienvenido a la guardería canina BarGer!
        </p>
        <Panel header="Mira el código...">
        <a
          className="App-link"
          href="https://github.com/Lamermelada42/guarderia-frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          Revisa nuestro código...
        </a>
        </Panel>
        <p><Divider /></p>
        <p>
        <img style={{ width: 150, height: 170 }} img src={form} className="App-form" alt="form" />
        </p>   
        <p>
        O... registrate junto a tu mascota
        </p>    
        <p>
        <Dialog header="Crear persona" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
          <span className='p-float-label'>
          <InputText value={this.state.booking.bookingId} id="bookingId" onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState => {
            let booking = Object.assign({}, prevState.booking)
            booking.bookingId = val
            return { booking };
          })}} />
          <label htmlfor='bookingId'>Booking Id</label>
          </span>
          <span className='p-float-label'>
          <InputText value={this.state.booking.userName} id="user.name" onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState => {
            let booking = Object.assign({}, prevState.booking)
            booking.userName = val
            return { booking };
          })}} />
          <label htmlfor='user.name'>User name</label>
          </span>
          <span className='p-float-label'>
          <InputText value={this.state.booking.petId} id="petId" onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState => {
            let booking = Object.assign({}, prevState.booking)
            booking.petId = val
            return { booking };
          })}} />
          <label htmlfor='petId'>Mascota Id</label>
          </span>
          <span className='p-float-label'>
          <InputText value={this.state.booking.userDateCreated} id="user.dateCreated" onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState => {
            let booking = Object.assign({}, prevState.booking)
            booking.userDateCreated = val
            return { booking };
          })}} />
          <label htmlfor='user.dateCreated'>Fecha</label>
          </span>
        </Dialog>
          <Menubar model={this.items}/>
        <Request />
        </p>  
        <p>
        Una vez llenes tus datos te avisarémos sobre tu visita... <h4> ¡Recuerda el cupo máximo! </h4>
        </p>
        <p><Divider /></p>
        <img style={{ width: 410, height: 380 }} img src={muchacho} className="Muchacho-logo" alt="muchacho" />
        <p>¡Nuestros bookings!</p>
        <p>
          <Panel header="Bookings...">
          <DataTable value={this.state.bookings}>
            <Column field="bookingId" header="ID registro"></Column>
            <Column field="user.name" header="Usuario"></Column>
            <Column field="petId" header="Id mascota"></Column>
            <Column field="user.dateCreated" header="Fecha de registro"></Column>
          </DataTable>  
          </Panel>
        </p>  
        <p><Divider /></p>
        <img style={{ width: 410, height: 380 }} img src={user} className="User-logo" alt="user" />
        <p>¡Nuestros clientes registrados!</p>
        <p>
          <Panel header="Clientes...">
          <DataTable value={this.state.users}>
            <Column field="id" header="ID"></Column>
            <Column field="petName" header="Mascota"></Column>
            <Column field="ownerDocument" header="Documento"></Column>
            <Column field="user.name" header="Cliente"></Column>
            <Column field="user.dateCreated" header="Fecha de registro"></Column>
          </DataTable>  
          </Panel>
        </p>  
      </header>   
    </div>
        );
    }
    showSaveDialog(){
      this.setState({
        visible : true
      });
    }
}