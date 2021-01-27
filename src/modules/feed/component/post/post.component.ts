import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DateTime } from 'luxon';
import { Post } from '../../post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input()
  post: Post;

  @ViewChild("anchor")
  anchor: ElementRef<HTMLDivElement>;
  
  public get humanizeDate() {
    return DateTime.fromISO(this.post.createdAt);
  }
  
  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    console.log(this.post);
  }
  

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  async like() {
    this.postService.like(this.post);
    this.post.liked = true;
  }
}
