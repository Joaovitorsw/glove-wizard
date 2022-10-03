import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { NgxCdkTableModule } from '../../../ngx-cdk-table.module';
import { AutoAbbrevDirective } from './auto-abbrev.directive';
const TEST_TEMPLATE = `
 <div style="width:120px;height:120px" data-testid="container-text">
   <span style="width:120px;height:120px" gloveWizardAutoAbbrev class="text-overflow" data-testid="text-overflow">
      <span style="width:220px;height:220px" class="text" data-testid="text">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
         dolorem veniam ratione et rerum, animi nostrum aliquid in
         repellat quis! Sapiente dolorum veniam officia labore iusto
         nihil, vero dolor doloremque.
       </span>
   </span>
  </div>
`;

describe('AutoAbbrevDirective', () => {
  it('should create abbrev tag when text is too long', async () => {
    await render(TEST_TEMPLATE, {
      imports: [NgxCdkTableModule],
      declarations: [AutoAbbrevDirective],
    });

    const textOverflow = screen.findByTestId('text-overflow');
    const abbr = (await textOverflow).querySelector('abbr');
    expect(abbr).toBeTruthy();
  });
});
