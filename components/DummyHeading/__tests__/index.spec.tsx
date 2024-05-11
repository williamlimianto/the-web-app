import { render, screen } from '@lib/test-utils';

import DummyHeading from '../index';

describe('DummyHeading', () => {
  it('should render', () => {
    render(<DummyHeading />);
  
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
  
})
