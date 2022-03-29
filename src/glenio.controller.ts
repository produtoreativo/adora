import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { Injectable } from '@nestjs/common';
import { InjectContext } from 'nest-puppeteer';
import type { BrowserContext } from 'puppeteer';

@Controller()
export class GlenioController {
  constructor(
    @InjectContext() private readonly browserContext: BrowserContext,
  ) {}


  @Get('glenio')
  async getApplication() {
      const page = await this.browserContext.newPage();
      await page.setDefaultNavigationTimeout(360000);
      await page.setViewport({ width: 1200, height: 800 });
    
      console.time("LoadPanelTime");
    
      await page.goto(process.env.APPLICATION_URL);
    
      const loginSelector = 'form input[name="login"]';
      await page.waitForSelector(loginSelector);
    
      await page.type(loginSelector, process.env.APPLICATION_USERNAME);
      await page.type("#password", process.env.APPLICATION_PASSWORD);
    
      const loginBtn = "div.flex.login-center > div > div:nth-child(5) > button";
      await page.click(loginBtn);
    
      const inputPanel =
        "#printableList > span > div > div > div > div > div > div > div.flex.px-10.sm3 > div > div > div.v-input__slot > div.v-select__slot > input[type=text]";
      await page.waitForSelector(inputPanel);
    
      await page.type(inputPanel, "Helena Irigon");
    
      const helenaRow =
        "#printableList > span > div > div > div > div > div > div > div.flex.px-10.sm3 > div > div > div.v-input__slot > div.v-menu > div > div > div > div > a";
      await page.waitForSelector(helenaRow);
    
      await page.evaluate((firstRow) => {
        document.querySelector(firstRow).click();
      }, helenaRow);
    
      const panelContent =
        "#printableList > span > div > div > div > article > div > article > div:nth-child(1) > div.v-card__title.card-table-title.secaotopo.v-card__title--primary > aside > span";
      await page.waitForSelector(panelContent);
    
      console.timeEnd("LoadPanelTime");
  }

}
