import { Component, input, output, signal } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <label for="form-field">{{ label() }}
      <input name="form-field" [formControl]="formControl" placeholder="Escreva algo aqui" >
    </label>
  `,
})
export class FromFieldComponent {

  label = input.required();

  formControl = new FormControl<string>('', { nonNullable: true });

  valueChanges = outputFromObservable(this.formControl.valueChanges)

  // valueChanges = output<string>()

  // ngOnInit() {
  //   this.formControl.valueChanges.subscribe(value => this.valueChanges.emit(value));
  // }

} 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FromFieldComponent],
  template: `
    <app-form-field label="Mensagem" (valueChanges)="formFieldValue.set($event)" />

    <hr> 

    <div>
      <strong>Valor do componente FormField</strong>
      <div>{{ formFieldValue() }}</div>
    </div>
  `,
})
export class AppComponent {
  
  formFieldValue = signal('');

}
