import {BehaviorSubject} from "rxjs";

export class PageState {
    currentPage = new BehaviorSubject(1);
}
