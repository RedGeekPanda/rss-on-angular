import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FeedEntry} from '../models/feed-entry';
import {FeedService} from '../feed.service';

@Component({
  selector: 'app-feed-entry-list',
  templateUrl: './feed-entry-list.component.html',
  styleUrls: ['./feed-entry-list.component.css']
})
export class FeedEntryListComponent implements OnChanges {
  feedEntries: FeedEntry[];
  @Input() selectedFeedEntryGuid: string;
  @Output() selectedFeedEntryGuidChange = new EventEmitter<string>();
  @Input() private feedUrl: string;

  constructor(private feedService: FeedService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('feedUrl')) {
      this.feedService.getFeedEntries(this.feedUrl)
        .subscribe(feedEntries => this.feedEntries = feedEntries);
    }
  }

  onSelect(feedEntry: FeedEntry): void {
    this.selectedFeedEntryGuidChange.emit(feedEntry.guid);
  }
}
