import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

  char = {
    x: 1,
    y: 1,
    history: { x: 1, y: 1 }
  }

  counter = 0;
  state = { daimonds: 0 }
  enemys = []
  coordinates = [{ x: 0, y: 4 }, { x: 2, y: 6 }, { x: 4, y: 8 }]

  terrain = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 9, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1]
  ]

  ngOnInit() {
    window.addEventListener('keydown', this.keyboard.bind(this))
    this.terrain[this.char.y][this.char.x] = 0
  }

  keyboard(e) {
    if (e.key == 'ArrowRight' && this.char.x < 20) this.go('right');
    if (e.key == 'ArrowLeft' && this.char.x > 0) this.go('left');
    if (e.key == 'ArrowUp' && this.char.y > 0) this.go('up');
    if (e.key == 'ArrowDown' && this.char.y < 12) this.go('down');

    const place = this.terrain[this.char.y][this.char.x];// МІСЦЕ (число де стоїть землерйка)
    let over_place = 0;
    if (this.char.y > 0) over_place = this.terrain[this.char.y - 1][this.char.x];
    console.log(this.char.y);
    console.log(this.char.x);
    // не виходити за межі
    //if (this.char.x > 20) this.char.x = 20;
    //if (this.char.x < 0) this.char.x = 0;
    //if (this.char.y > 12) this.char.y = 12;
    //if (this.char.y < 1) alert() // this.char.y = 0;

    // назад - якщо камінь
    if (place == 7) this.go('back');

    // лічильник діамантів
    if (place == 9) this.counter++

    //прокопування тунелів
    this.terrain[this.char.y][this.char.x] = 0 // винести в метод - this.setPlace(0)

    // падіння камінця -- подумати/реалызувати падыння быльше 1
    if (over_place == 7) {
      const x = this.char.x;
      const y = this.char.y;
      let rx = x;
      let ry = y - 1;
      setTimeout(() => {

        const goDown = setInterval(() => {
          console.log(y);
          if (this.terrain[ry + 1][rx] == 0) {
            this.terrain[ry][rx] = 0;
            this.terrain[ry + 1][rx] = 7;
            ry++;
          }else{
            clearInterval(goDown);
          }
        }, 500)
        // this.terrain[y - 1][x] = 0;
        // this.terrain[y][x] = 7;

      }, 2000)
    }

  }

  refresh_history() {
    this.char.history.x = this.char.x;
    this.char.history.y = this.char.y;
  }

  go(type) {
    if (type == 'back') {
      console.log('back');
      this.char.x = this.char.history.x;
      this.char.y = this.char.history.y;
    }
    this.refresh_history();
    if (type == 'up') this.char.y--;
    if (type == 'down') this.char.y++;
    if (type == 'left') this.char.x--;
    if (type == 'right') this.char.x++;
  }
}



// const selector = (target) => {document.querySelector('.fsdf')}
// const a = selector('.fsdf')
// const a = document.querySelector('.fsdf')