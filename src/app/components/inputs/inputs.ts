import {Component, forwardRef, input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-inputs',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './inputs.html',
  styleUrl: './inputs.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Inputs),
      multi: true
    }
  ]
})
export class Inputs implements ControlValueAccessor{
  value = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  handleBlur(): void {
    this.onTouched();
  }

  public type = input<"text" | "number" | "date" | "select" | "checkbox" | "email" >("text")
  public id = input<string>('id')
  public placeholder = input<string>('')
}
