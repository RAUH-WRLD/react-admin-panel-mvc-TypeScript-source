export default class DashboardModel {
    public current_year = new Date().toString().split(" ")[3];
    public processedSubscriptions: {
        year: string;
        Silver: number;
        Bronze: number;
        Trial: number;
        Gold: number;
        Group: number;
    }[] = [];
    public processedProfits: {
        year: string;
        Profit: number;
        Cost: number;
    }[] = [];
    public processedResources: {
        year: string;
        Keyword_Research: number;
    }[] = [];
}
