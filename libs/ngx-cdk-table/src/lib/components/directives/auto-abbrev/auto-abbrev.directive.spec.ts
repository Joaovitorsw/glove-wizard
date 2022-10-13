import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { NgxCdkTableModule } from '../../../ngx-cdk-table.module';
import { AutoAbbrevDirective } from './auto-abbrev.directive';

const maxWidthStyle = `width:50px;max-width: 50px;white-space: nowrap;`;

const TEST_TEMPLATE = `
<table style="width:100%">
<tr style="height: 70px;">
<th style="${maxWidthStyle};
        overflow: hidden;">Test</th>
<th style="width:100%">Test</th>
<th style="width:100%">Test</th>
</tr>
  <tr style="height: 70px;">
  <td style="${maxWidthStyle};overflow: hidden;">
     <span style="${maxWidthStyle}" gloveWizardAutoAbbrev class="text-overflow" data-testid="text-overflow">
       <span class="text" data-testid="text" >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel
        tincidunt lacinia.
       </span>
     </span>
   </td>
    <td style="width:100%">
     Test
     </td>
    <td style="width:100%">
     Test
     </td>
  </tr>
</table>

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
