import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedStore } from 'src/modules/feed/feed.store';
import { Room } from '../../room.model';
import { RoomState } from '../../room.state';
import { RoomStore } from '../../room.store';
import { RoomQueries } from '../../services/room.queries';
import { RoomService } from '../../services/room.service';
import { RoomCreateModalComponent } from '../room-create-modal/room-create-modal.component';

@Component({
  selector: 'app-room-menu',
  templateUrl: './room-menu.component.html',
  styleUrls: ['./room-menu.component.less']
})
export class RoomMenuComponent implements OnInit {
  roomId$: Observable<string | undefined>;

  @ViewChild("modal")
  roomCreateComponent: RoomCreateModalComponent;

  rooms: Room[];

  constructor(private feedStore: FeedStore, private queries: RoomQueries, private roomService: RoomService, private roomStore: RoomStore, private router: Router) {
    this.roomId$ = feedStore.roomId$;
    this.roomStore.value$.subscribe(state => this.rooms =  state.rooms);
  }

  async ngOnInit() {
    const rooms = await this.queries.getAll();
    const roomState: RoomState = {
      rooms: rooms
    }
    this.roomStore.set(roomState);
    const roomId = localStorage.getItem('roomId');
    if (roomId) this.router.navigate(["app", roomId]);
  }

  goToRoom(room: Room) {
    localStorage.setItem('roomId',room.id)
    this.router.navigate(['app', room.id])
  }

  createRoomModal() {
    this.roomCreateComponent.open();
  }
}
