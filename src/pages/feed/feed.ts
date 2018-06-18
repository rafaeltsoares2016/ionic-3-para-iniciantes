import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
      MovieProvider
  ]
})
export class FeedPage {
    public objeto_feed = {
        titulo: 'Rafael Soares',
        data: 'April 27, 2018',
        descricao: 'Estou criando um app incrível...',
        qtd_likes: 12,
        qtd_comments: 4,
        data_comment: '11h ago'
    }

    public lista_filmes = new Array<any>();

    public nome_usuario: string = 'Rafael Soares do Código';

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private movieProvider: MovieProvider
    ) {
    }

  public somaDoisNumeros(num1:number, num2:number): void{
      // alert(num1 + num2);
  }

  ionViewDidLoad() {
    this.movieProvider.getLatestMovies().subscribe(
        data=>{

            const response = (data as any);
            const objeto_retorno = (data as any);
            this.lista_filmes = objeto_retorno.results;

            console.log((data as any)._body);
        }, error=>{
            console.log(error);
        }
    )
    // this.somaDoisNumeros(10, 99);
  }

}
