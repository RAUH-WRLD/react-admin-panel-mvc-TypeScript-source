import {AController} from "@eagerlogic/react-mvc";
import DashboardModel from "../models/DashboardModel";
export default class DashboardController extends AController<DashboardModel> {
    protected createInitialModel(): DashboardModel {
        return new DashboardModel();
    }
    public documentTitleChange(title: string) {
        return (document.title = title);
    }
    public processAccount(account: {email: string; password: string}, connectStatus: boolean, setRedirectToLoginStatus: (status: boolean) => void) {
        const denyAccess = () => {
            window.history.pushState(null, "", "/#/login");
            return setRedirectToLoginStatus(true);
        };
        if (account.email === "" && account.password === "" && !connectStatus) denyAccess();
        else return false;
        this.render(this.model);
    }
    public processDate(current_date: string) {
        const current_date_splitted = current_date.split(" ");
        const new_current_date = [current_date_splitted[2], current_date_splitted[1], current_date_splitted[3]];
        return new_current_date.join(" ");
    }
    public getRandomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
    public getRandomElements = (step: number, start_num: number, min: number, max: number) => {
        if (step === 0) return start_num;
        else return this.getRandomNum(min, max);
    };
    public processElementsCheckboxes(event: any, option: string) {
        const checkbox_clicked_className = event.target.classList.value.split(" ")[2];
        return {
            className: checkbox_clicked_className,
            checkbox: option,
        };
    }
    public processElementsStatisticsDeactivated(elements_deactivated: Array<string>) {
        if (elements_deactivated.length > 0)
            elements_deactivated.forEach((className: string, index: number) => {
                const element = document.querySelector<any>(`.${className}`);
                if (element) {
                    element.classList.toggle("hidden");
                    const surface = element.parentElement;
                    const mutationObserver = new MutationObserver((mutations) =>
                        mutations.forEach((mutation) =>
                            mutation.addedNodes.length > 0
                                ? mutation.addedNodes.forEach((node: any) => {
                                      const dot = element.nextElementSibling;
                                      if (node === dot) {
                                          dot?.classList.toggle("hidden");
                                          const tooltip = surface.nextElementSibling;
                                          const tooltipList = tooltip.firstChild.lastChild;
                                          const tooltipItems = document.querySelectorAll(`.${tooltipList.className} > li`);
                                          return tooltipItems.forEach((item: any) => (element.classList.contains(item.firstChild.innerHTML) && element.classList.contains("hidden") ? item.classList.add("hidden") : false));
                                      } else return false;
                                  })
                                : false,
                        ),
                    );
                    mutationObserver.observe(surface, {
                        attributes: true,
                        characterData: true,
                        childList: true,
                        subtree: true,
                        attributeOldValue: true,
                        characterDataOldValue: true,
                    });
                } else return false;
            });
        else return false;
    }
    public processElementsCheckboxesClicked(clickedCheckboxes: Array<string>) {
        if (clickedCheckboxes.length > 0)
            clickedCheckboxes.forEach((className: string) => {
                const checkbox = document.querySelector<HTMLInputElement>(`.${className}`);
                if (checkbox) checkbox.checked = !checkbox.checked;
                else return false;
            });
        else return false;
    }
    public processSubscriptions(subscriptions: {year: string; Silver: number; Bronze: number; Trial: number; Gold: number; Group: number}[]) {
        const difference = Number(this.model.current_year) - Number(subscriptions[0].year);
        for (let i = 0; i <= difference; i++) {
            let start_year = Number(subscriptions[0].year);
            let year = (start_year += i);
            const subscription = {
                year: year.toString(),
                Silver: this.getRandomElements(i, subscriptions[0].Silver, 100, 600),
                Bronze: this.getRandomElements(i, subscriptions[0].Bronze, 100, 600),
                Trial: this.getRandomElements(i, subscriptions[0].Trial, 100, 600),
                Gold: this.getRandomElements(i, subscriptions[0].Gold, 100, 600),
                Group: this.getRandomElements(i, subscriptions[0].Group, 100, 600),
            };
            this.model.processedSubscriptions.push(subscription);
        }
        return [...this.model.processedSubscriptions];
    }
    public processProfits(profits: {year: string; Profit: number; Cost: number}[]) {
        const difference = Number(this.model.current_year) - Number(profits[0].year);
        for (let i = 0; i <= difference; i++) {
            let start_year = Number(profits[0].year);
            let year = (start_year += i);
            const profit = {
                year: year.toString(),
                Profit: this.getRandomElements(i, profits[0].Profit, 100, 6000),
                Cost: this.getRandomElements(i, profits[0].Cost, 100, 6000),
            };
            this.model.processedProfits.push(profit);
        }
        return [...this.model.processedProfits];
    }
    public processResources(resources: {year: string; Keyword_Research: number}[]) {
        const difference = Number(this.model.current_year) - Number(resources[0].year);
        for (let i = 0; i <= difference; i++) {
            let start_year = Number(resources[0].year);
            let year = (start_year += i);
            const resource = {
                year: year.toString(),
                Keyword_Research: this.getRandomElements(i, resources[0].Keyword_Research, 50, 100),
            };
            this.model.processedResources.push(resource);
        }
        return [...this.model.processedResources];
    }
    public processResourcesItems() {
        const legend = document.querySelector<HTMLSpanElement>(".recharts-legend-item-text");
        const tooltipWrapper = document.querySelectorAll<HTMLDivElement>(".recharts-tooltip-wrapper");
        (legend as any).innerHTML = legend?.innerHTML.split("_").join(" ");
        const mutationObserver = new MutationObserver((mutations) => mutations.forEach((mutation) => (mutation.addedNodes.length > 0 ? mutation.addedNodes.forEach((node: any) => (node.firstChild ? ((node.firstChild.firstChild as any).innerHTML = node.firstChild.firstChild.innerHTML.split("_").join(" ")) : false)) : false)));
        return mutationObserver.observe(tooltipWrapper[2], {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true,
            attributeOldValue: true,
            characterDataOldValue: true,
        });
    }
    public getCurrentTime() {
        return new Date().toLocaleTimeString();
    }
}
