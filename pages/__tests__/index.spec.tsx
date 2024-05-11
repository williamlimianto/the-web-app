import { render, screen } from '@lib/test-utils';

import DummyPage from '../index.page';

it('should render', () => {
  render(<DummyPage />);

  expect(screen.getByText('Hello world')).toBeInTheDocument();
});
