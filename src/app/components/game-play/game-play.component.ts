import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

declare var $: any

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit {

  sectors: any = [
    {
      sectorName: 'Finance',
      data: {
        stocksQty: 600,
        ratePerQty: 100
      }
    },
    {
      sectorName: 'Technology',
      data: {
        stocksQty: 1000,
        ratePerQty: 650
      }
    },
    {
      sectorName: 'Consumer Service',
      data: {
        stocksQty: 4500,
        ratePerQty: 50
      }
    },
    {
      sectorName: 'Manufaturing',
      data: {
        stocksQty: 400,
        ratePerQty: 200
      }
    }
  ]

  //Method Variables
  mvGameStartInterval: any

  //Share Market

  purchaseModalData = { index: 0, stocksQty: 0, ratePerQty: 0}
  puchaseModalTotal: number = 0
  mPurchaseStockQuantity: number = 0

  //Your Transactions

  playerStartFrom: number = 1000
  playerCurrentIncome: number = 0
  playerTransactions: any = []
  playerTotal: number = this.playerStartFrom


  //Your Assets
  yourAssets: any = []
  sellModalData = { index: 0, stocksQty: 0, marketRate: 0, netWorth: 0}
  mSellingRate: number = 0

  //Other Player Selling - Buy from other players
  otherPlayerMarket = []
  selectedPlayerMarket = { player: '', finance: { stocksQty: 0, rate: 0 }, technology: { stocksQty: 0, rate: 0 }, consService: { stocksQty: 0, rate: 0 }, manufaturing: { stocksQty: 0, rate: 0 } };
  mQtyBuyingFromOtherPlayer: number = 0
  otherPlayerMarketTotal: number = 0
  selectTabWhenOpenFromOtherPlayerModal: String = ''

  //Chart
  datasets: any = []

  //Game data
  gameTurn: number = 1

  gameTurnTime: number = 1
  gameTime: number = 2
  timerMns: number = 0
  timerSecs: number = 0

  gameStartTimeOut: number = 5

  //remove me Later
  tempData = []

  stockMarketStatisticsChart = []

  quitGameToolTip: String = 'If you quit, the game will stop'

  playersForStartTheGame: any = ["Player X", "Player Y"]


  constructor(private router: Router) {
 
  }

  ngOnInit() {

    this.initYourAssets()

    this.initOthersDetails()
  }


  showPurchaseModal(item, index) {

    if (item.data.stocksQty > 0) {
      $('#modalPurchaseStock').modal('show')

      this.purchaseModalData =
        {
          index: index,
          stocksQty: item.data.stocksQty,
          ratePerQty: item.data.ratePerQty,
        }
    }
  }

  calculatePurchaseTotal(rate) {
    this.puchaseModalTotal = Math.round(this.mPurchaseStockQuantity * rate)
  }

  makePurchase(itemQty, index) {

    this.sectors[index].data.stocksQty = (itemQty.stocksQty - this.mPurchaseStockQuantity)

    var record = {
      turn: this.gameTurn,
      sector: this.sectors[index].sectorName,
      status: "PURCHASED",
      qty: this.mPurchaseStockQuantity,
      cps: itemQty.ratePerQty,
      total: this.puchaseModalTotal,
      income: 0
    }

    this.playerTotal = this.playerTotal - this.puchaseModalTotal

    this.pushToPlayerTransactions(record)

    this.mPurchaseStockQuantity = 0
    this.puchaseModalTotal = 0
  }


  //Your Transactions

  pushToPlayerTransactions(item) {

    //$('#modalSellStock').modal('show')


    if (item.status === "SOLD") {
      item.income = parseFloat(item.income) + parseFloat(item.total)

      this.playerCurrentIncome = this.playerTransactions
        .map(item => item.income)
        .reduce((i1, i2) => { return parseFloat(i1) + parseFloat(i2) })

    } else {
      item.income = parseFloat(item.income) - parseFloat(item.total)
    }

    this.playerTransactions.unshift(item)
  }


  //Your Assets

  initYourAssets() {
    this.yourAssets = [
      {
        sectorName: 'Finance',
        style: 'bg-info',
        sellingRate: 0,
        data: {
          stocksQty: 600,
          ratePerQty: 100
        }
      },
      {
        sectorName: 'Technology',
        style: 'bg-success',
        sellingRate: 0,
        data: {
          stocksQty: 1000,
          ratePerQty: 650
        }
      },
      {
        sectorName: 'Consumer Service',
        style: 'bg-primary',
        sellingRate: 0,
        data: {
          stocksQty: 4500,
          ratePerQty: 50
        }
      },
      {
        sectorName: 'Manufaturing',
        style: 'bg-rose',
        sellingRate: 0,
        data: {
          stocksQty: 400,
          ratePerQty: 200
        }
      }
    ]
  }

  showSellingRateModal(item, index) {

    if (item.data.stocksQty > 0) {
      $('#modalSellStock').modal('show')

      var marketRate = this.sectors[index].data.ratePerQty
      var netWorth = this.sectors[index].data.ratePerQty * item.data.stocksQty

      this.sellModalData = {
        index: index,
        stocksQty: item.data.stocksQty,
        marketRate: marketRate,
        netWorth: netWorth
       
      }
    }

  }

  saveSellingRate(item) {
    this.yourAssets[item.index].sellingRate = this.mSellingRate
  }


  //Other Player Selling - Buy from other players

  calculateOtherPlayersBuyingTotal(rate) {
    this.otherPlayerMarketTotal = Math.round(this.mQtyBuyingFromOtherPlayer * rate)
  }

  //------- this is a tempory method ------- //
  initOthersDetails() {
    this.otherPlayerMarket = [
      {
        player: 'Jimy',
        finance: {
          stocksQty: 100,
          rate: 0.5
        },
        technology: {
          stocksQty: 100,
          rate: 100
        },
        consService: {
          stocksQty: 100,
          rate: 100
        },
        manufaturing: {
          stocksQty: 100,
          rate: 100
        },
      },
      {
        player: 'Goku',
        finance: {
          stocksQty: 550,
          rate: 25
        },
        technology: {
          stocksQty: 100,
          rate: 100
        },
        consService: {
          stocksQty: 100,
          rate: 100
        },
        manufaturing: {
          stocksQty: 100,
          rate: 100
        },
      }
    ]
  }

  openBuyFromOthersModal(item, sector) {
    this.selectedPlayerMarket = item
    this.selectTabWhenOpenFromOtherPlayerModal = sector
    $('#modalBuyFromOtherPlayers').modal('show')
  }

  clearPreviousTabDetail() {
    this.mQtyBuyingFromOtherPlayer = 0
    this.otherPlayerMarketTotal = 0
  }

  makePurchaseFromOtherPlayer(sector) {
    console.log(sector)
    console.log(this.mQtyBuyingFromOtherPlayer)
    console.log(this.otherPlayerMarketTotal)
  }


}
