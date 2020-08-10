import React, {Component} from 'react';
import SimpleTable from './SimpleTable';


class App extends Component {
    render() {

      return (
   
        <div class='some-page-wrapper'>
  <div class='row'>
    <div class='column'>
      <div class='column-one'>
        Some Text in Column One
      </div>
    </div>
    <div class='column'>
      <div class='column-two'>
        Some Text in Column Two
      </div>
    </div>
    <div class='column'>
      <div class='column-three'>
        Some Text in Column Three
      </div>
    </div>
  </div>
  <div class='row 2'>
    <div class='column'>
      <div class='column-four'>
        Some Text in Row 2, Column One
      </div>
    </div>
    <div class='column'>
      <div class='column-five'>
        Some Text in Row 2, Column Two
      </div>
    </div>
    <div class='column'>
      <div class='column-six'>
        Some Text in Row2, Column Three
      </div>
    </div>
  </div>
  <SimpleTable/>
</div>

      );
    }
  }
  export default App;
