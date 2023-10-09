import { Stage, Page } from '../src/index';
import MenuPanel from './MenuPanel';
import './test.scss'

interface App {
    stage: Stage,
    menuPage?: Page
}

(() => {
    const stage = new Stage();
    if (stage.el) {
        document.body.appendChild(stage.el);
    }

    const app: App = {
        stage,
    };

    app.menuPage = new MenuPanel({ app });

    stage.addPanel(app.menuPage);
    stage.showPanel(app.menuPage);
})();