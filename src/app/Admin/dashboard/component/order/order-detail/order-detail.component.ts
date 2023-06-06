import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  private subscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private admin: ApiService,
    private _router: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private data_service: ComponentService,
  ) { }
  id: number;
  order_detail: any;
  order_product: any;
  ngOnInit() {
    // this.get_order_id()
    this.id = this._router.snapshot.params['id'];
    this.subscription =this.admin.get_order_id(this.id).subscribe(
      (data: any) => {
        this.order_detail = data.data;
        this.order_product = data.data.order_details;
        console.log('ddd', this.order_product);
        console.log('ddd222', this.order_detail);
      },
      (error) => {
        console.log(error);
      }
    );
    this.send_title();
  }
  title = 'Chi tiết đơn hàng';
    // gửi title đi
    send_title() {
      this.data_service.Title_message(this.title);
    }
  getStatusText(status: number): string {
    switch (status) {
      case 1:
        return 'Đang chờ xử lý';
      case 2:
        return 'Đã xác nhận đơn hàng';
      case 3:
        return 'Đã xuất hàng - đang giao';
      case 4:
        return 'Hoàn thành';
      case 5:
        return 'Hủy đơn';
      default:
        return '';
    }
  }
  getStatusStyle(status: number): any {
    let background = '';
    let color = '';

    switch (status) {
      case 1:
        // background = 'SandyBrown';
        background = 'lightgrey';
        color = 'black';
        // background = 'lightblue';
        // color = 'black';
        break;
      case 2:
        background = 'rgb(255 250 205)';
        // background = 'lightgreen';
        color = 'black';
        break;
      case 3:
        background = 'rgb(178 223 238)';
        // background = 'lightyellow';
        color = 'black';
        break;
      case 4:
        background = 'lightgreen';
        // background = 'lightgrey';
        color = 'black';
        break;
      case 5:
        background = 'lightcoral';
        color = 'white';
        break;
      default:
        break;
    }

    return { 'background-color': background, color: color };
  }
  // get_order_id(id: number) {
  //   this.id = id;
  //  this.admin.get_order_id(this.id).subscribe((data) => {
  //     this.order_detail = data.data;
  //     this.order_product = data.data.order_details;
  //     console.log('ddd', this.order_product);
  //   });
  // }
}
