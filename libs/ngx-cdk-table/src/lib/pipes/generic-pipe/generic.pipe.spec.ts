import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DEFAULT_PIPES_PROVIDERS } from '../../models/interface/generic-pipe';
import { CURRENCY_PIPE, DATE_PIPE } from '../../tokens/generic-pipe.token';
import { GenericPipe } from './generic.pipe';

describe('GenericPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DEFAULT_PIPES_PROVIDERS],
    });
  });

  it('create an instance', () => {
    const injectorDependencies = TestBed.inject(Injector);
    const pipe = new GenericPipe(injectorDependencies);

    expect(pipe).toBeTruthy();
  });

  it('should transform value in currency', () => {
    const injectorDependencies = TestBed.inject(Injector);
    const pipe = new GenericPipe(injectorDependencies);
    const pipeTransform = pipe.transform('100', CURRENCY_PIPE, 'BRL');
    const expectedValue = 'R$100.00';

    expect(pipeTransform).toBe(expectedValue);
  });
  it('should transform value in date', () => {
    const injectorDependencies = TestBed.inject(Injector);
    const pipe = new GenericPipe(injectorDependencies);
    const pipeTransform = pipe.transform(new Date(), DATE_PIPE, 'dd/MM/yyyy');
    const expectedValue = new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    expect(pipeTransform).toBe(expectedValue);
  });
  it('should return original value', () => {
    const injectorDependencies = TestBed.inject(Injector);
    const pipe = new GenericPipe(injectorDependencies);

    pipe.transform(null);

    expect(pipe).toBeTruthy();
  });
  it('should cover if when no pipe arguments', () => {
    const injectorDependencies = TestBed.inject(Injector);
    const pipe = new GenericPipe(injectorDependencies);

    pipe.transform(new Date(), DATE_PIPE);

    expect(pipe).toBeTruthy();
  });
});
