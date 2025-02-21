import { Component, OnInit } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service';
import { ListingdetailsService } from 'src/app/services/listingdetails.service';
import { SellerdetailsService } from 'src/app/services/sellerdetails.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-addetails',
  templateUrl: './addetails.page.html',
  styleUrls: ['./addetails.page.scss'],
})
export class AddetailsPage implements OnInit {
  text = 'Check out the Ionic Academy!';
  url = 'https://ionicacademy.com';
  listing: any;
  id: any;
  postdetails: string;
  postreview: string; 
  posttitle: string;
  postcontact:string;
  postprice:string;
  postlocation: string;
  postdescription:string;
  postreview_title: string;
  postreview_description: string;
  postreview_date: string;
  postcleandescription: string;
  postcreated_at: string;
  postnegotiable: string;
  postviews: string;
  poststate: string;

  seller: any;
  sellerinfo: any;
  sellervalues: string;
  seller_email: string;
  seller_name: string;
  seller_id: any

  slideOpts = {
    zoom: false,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 20,
    direction: 'horizontal'
  }
  constructor(private getcategoriesService:GetcategoriesService, private listingdetails: ListingdetailsService,
    private sellerdetails: SellerdetailsService,private socialSharing: SocialSharing,private actionSheetController: ActionSheetController,
    private router: Router, private chat:ChatService, private auth: AuthenticationService) { }

  ngOnInit() {

    this.listing = this.listingdetails.getAll()
    .subscribe(response => { 
      this.listing = response;
      console.log(this.listing);
      this.postdetails = this.listing['post-detail'][0];
      this.posttitle = this.postdetails["title"];
      this.postcontact = this.postdetails["contact_name"];
      this.postcreated_at = this.postdetails["created_at"]
      this.postprice = this.postdetails["price"];
      this.postviews = this.postdetails["visits"];
      this.poststate = this.postdetails["post_type_id"]
      console.log(this.postviews);
      this.postlocation = this.postdetails["country_code"];
      this.postdescription = this.postdetails["description"];
      this.postnegotiable = this.postdetails["negotiable"]
      this.postcleandescription = this.removeHTMLTags(this.postdescription);

      this.postreview = this.listing['product-review'];
      console.log(this.postreview);
      this.postreview_title = this.postreview["title"];
      this.postreview_description= this.postreview["description"];
      this.postreview_date= this.postreview["update_date"];

      // this.sellerreview = this.listing['seller-rating'];
      // console.log(this.sellerreview);
      // this.sellername = this.sellerreview["name"];
      // this.sellerlocation= this.sellerreview["name"];
      // this.sellerrating = this.sellerrating["rating"]
      console.log(this.posttitle);
    });

    this.seller = this.sellerdetails.getAll()
    .subscribe((response) => { 
      this.seller = response['Seller'];
      console.log(this.seller);
      this.seller_id = this.seller["id"];
      this.seller_name = this.seller["name"];
      this.seller_email= this.seller["email"];
    });
  }

  //Sharing the url code starts from here

  async share() {
    const actionSheet = await this.actionSheetController.create({
      header: "Share the Link:",
      buttons: [{
        text: 'Facebook',
        icon: "logo-facebook",
        handler: () => {
          //this.uploadImages();
          this.shareFacebook();
        }
      },
      {
        text: 'Whatsapp',
        icon: "logo-whatsapp",
        handler: () => {
          this.shareWhatsApp();
        }
      },
      {
        text: 'Twitter',
        icon: "logo-twitter",
        handler: () => {
          this.shareTwitter();
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
  async shareTwitter() {
    // Either URL or Image
    this.socialSharing.shareViaTwitter(null, null, this.url).then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }
 
  async shareWhatsApp() {
    // Text + Image or URL works
    this.socialSharing.shareViaWhatsApp(this.text, null, this.url).then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }
  // async resolveLocalFile() {
  //   return this.file.copyFile(`${this.file.applicationDirectory}www/assets/imgs/`, 'shapes.svg', this.file.cacheDirectory, `${new Date().getTime()}.svg`);
  // }
 
  // removeTempFile(name) {
  //   this.file.removeFile(this.file.cacheDirectory, name);
  // }
 
  // async shareEmail() {
  //  let file = await this.resolveLocalFile();
 
  //   this.socialSharing.shareViaEmail(this.text, 'My custom subject', ['saimon@devdactic.com'], null, null, file.nativeURL).then(() => {
  //     this.removeTempFile(file.name);
  //   }).catch((e) => {
  //     // Error!
  //   });
  //}
 
  async shareFacebook() {
   // let file = await this.resolveLocalFile();
 
    // Image or URL works
    this.socialSharing.shareViaFacebook(null, null, this.url).then(() => {
      console.log('shared');
    }).catch((e) => {
      console.log(e);
    });
  }
  removeHTMLTags(stringdata){
  {
      var strInputCode = stringdata;
       strInputCode = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
       console.log(strInputCode);
       return strInputCode;
      }
    }
    
    onGoToChat(){
      this.chat.buddy = this.seller_id;
      this.id = this.chat.buddy;
      //this.chat.user_email = this.auth.currentUserEmail
      console.log(this.seller_id);
      this.router.navigate(['/buddychat/:'+this.id]);
    }
 }
 