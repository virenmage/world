import * as React from 'react';

interface Props {
    test: string;
}
interface State {
    loaded: boolean;
}
class Index extends React.Component<Props, State> {
    public render(): JSX.Element {
        return (
            <div>This is test file.</div>
        );
    }

}

export default Index;