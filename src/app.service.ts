import { Injectable, NotFoundException, Query } from '@nestjs/common';
import {JSDOM} from 'jsdom';
import { UserDto } from './dtos/user.dto';
const HtmlTableToJson = require("html-table-to-json");

@Injectable()
export class AppService {
  async getAttendance(body:UserDto): Promise<string> {
    const result = await fetch("https://quiklrn.com/login.php", {
      method: "GET",
      redirect: "follow",
    });
    const cookie = await result.headers.get("set-cookie").slice(0, -7);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", cookie);
    var urlencoded = new URLSearchParams();
    urlencoded.append("email", body.email);
    urlencoded.append("password", body.password);
    const res = await fetch("https://quiklrn.com/user/login.php", {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
      credentials: "include",
    });
    const report = await fetch("https://quiklrn.com/user/report.php", {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });
    const dom = new JSDOM(await report.text());
    let table;
    try{
    table = dom.window.document.querySelector(
      ".table-responsive:nth-child(6) > .table"
    ).outerHTML;}
    catch(e)
    {
      throw new NotFoundException('Email or Password is incorrect');
    }
    const json = await HtmlTableToJson.parse(table, {values:true}).results;
    return  json[0];
  }
}
