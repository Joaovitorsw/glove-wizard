import { InjectionToken, Injector, Pipe, PipeTransform } from '@angular/core';
import { AvailablePipes } from '../../models/interface/generic-pipe';

@Pipe({
  name: 'genericPipe',
})
export class GenericPipe implements PipeTransform {
  constructor(private injector: Injector) {}

  transform(
    value: unknown,
    requiredPipe?: InjectionToken<AvailablePipes>,
    pipeArgs?: string[] | string | number | boolean | null
  ): unknown {
    if (!requiredPipe) return value;

    const pipe = this.injector.get<AvailablePipes & PipeTransform>(
      requiredPipe
    );

    return pipe.transform.call(pipe, value, pipeArgs);
  }
}
