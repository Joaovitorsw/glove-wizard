import { fireEvent, render, screen } from '@testing-library/angular';
import { NgxCdkTableModule } from '../../../ngx-cdk-table.module';
import { FormatTypedDateDirective } from './format-typed-date.directive';

const TEST_TEMPLATE = `
 <input
      data-testid="input"
      formatTypedDate
    />
`;
describe('FormatTypedDateDirective', () => {
  it('should format type data', async () => {
    await render(TEST_TEMPLATE, {
      imports: [NgxCdkTableModule],
      declarations: [FormatTypedDateDirective],
    });

    const input = await screen.findByTestId<HTMLInputElement>('input');

    fireEvent.keyUp(input, { target: { value: '24092001' } });

    expect(input.value).toBe('24/09/2001');
  });
});
