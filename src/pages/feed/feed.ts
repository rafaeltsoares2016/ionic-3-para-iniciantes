import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FilmeDetalhesPage } from './../filme-detalhes/filme-detalhes';

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

    public page = 1;

    public nome_usuario: string = 'Rafael Soares do Código';

    public loader;

    public refresher;

    public isRefreshing: boolean = false;

    public infiniteScroll;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private movieProvider: MovieProvider,
      public loadingCtrl: LoadingController
    ) {
    }

    abreCarregando() {
        this.loader = this.loadingCtrl.create({
            content: "Carregando filmes..."
        });
        this.loader.present();
    }

    fechaCarregando() {
        this.loader.dismiss();
    }

  public somaDoisNumeros(num1:number, num2:number): void{
      // alert(num1 + num2);
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  abrirDetalhes(filme) {
      console.log(filme);
      this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {
      this.page++;
      this.infiniteScroll = infiniteScroll;
      this.carregarFilmes(true);
    }

  carregarFilmes(newpage: boolean = false) {
    this.abreCarregando();

    this.movieProvider.getLatestMovies(this.page).subscribe(
        data=>{

            const response = (data as any);
            const objeto_retorno = (data as any);
            
            if(newpage) {
                this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
                this.infiniteScroll.complete();
            } else {
                this.lista_filmes = objeto_retorno.results;
            }

            this.fechaCarregando();
            if(this.isRefreshing) {
                this.refresher.complete();
                this.isRefreshing = false;
            }
        }, error=>{
            console.log(error);
            this.fechaCarregando();
            if(this.isRefreshing) {
                this.refresher.complete();
                this.isRefreshing = false;
            }
        }
    )
  }

}

    // this.somaDoisNumeros(10, 99);