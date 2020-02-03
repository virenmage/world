import * as React from 'react';
import './error404.scss';

interface Props {
    test: string;
}
interface State {
    loaded: boolean;
}
class Error404 extends React.Component<Props, State> {
    public render(): JSX.Element {
        return (
            <div className="errorWrapper">404 Page not found.</div>
        );
    }

}

export default Error404;