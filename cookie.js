const { get } = require('http');
const { parse } = require('numerable');
const {chromium} = require('playwright');

//

(async() =>{
    
    const browser = await chromium.connectOverCDP("http://localhost:9222")
    const context = await browser.contexts()[0]
    const page = context.pages()[0]

    async function clickmaincookie(){
        await page.click("//button[@id='bigCookie']")
        }
    
//
    async function decidebuildings(){
        const buildings = [
            {id:0, name:"Clicker", max:10},
            {id:1, name:"Grandma", max:10},
            {id:2, name:"Farm", max:10},
            {id:3, name:"Mine", max:10},
            {id:4, name:"Factory", max:10},
            {id:5, name:"Bank", max:15},
            {id:6, name:"Temple", max:15},    
            {id:7, name:"Wizard Tower", max:15},
            {id:8, name:"Shipment", max:15},
            {id:9, name:"Alchemy Lab", max:15},
            {id:10, name:"Portal", max:15},
            {id:11, name:"Time Machine", max:15},
            {id:12, name:"Antimatter Condenser", max:15},
            {id:13, name:"Prism", max:15},
            {id:14, name:"Chancemaker", max:15},
            {id:15, name:"Fractal Engine", max:15},
            {id:16, name:"Javascript Console", max:15},
            {id:17, name:"Idleverse", max:15},
        ]

        while(true){
            await iteratebuildings(buildings)
            for(let building of buildings){
                building.max = building.max*2
            }
        }   
            
    }
    
    async function iteratebuildings(buildings){
        for(let building of buildings){
            //get the price of the building
           var building_price = await getbuildingprice(building)
           //find numer of buildings owned
           var building_owned = Number(await page.textContent(`//div[@id='productOwned${building.id}']`))
           //find the number of cookies
            while(building_owned < building.max){
                await clickmaincookie()
                var cookies = await getcookiecount()
                if(cookies >= building_price){
                  await page.click(`(//div[@id='product${building.id}'])[1]`)
                  console.log(`Bought ${building.name}`)
                  building_owned = Number(await page.textContent(`//div[@id='productOwned${building.id}']`))
                  //building_owned++
                  //in the future, make a less hardcoded way to wait for the cookies to update
                  //gotta debug cuz in wizard tower, it clicks twice
                  //await page.waitForTimeout(8000)
                  building_price = await getbuildingprice(building)
                  console.log(console.log(`Current price: ${building_price}`))
                  console.log(console.log(`Buildings owned: ${building_owned}`))
                  console.log(console.log(`Current cookies: ${cookies}`))
            }
            else{
               /* console.log(`Not enough cookies for ${building.name}`)
                console.log(`Current cookies: ${cookies}`)
                console.log(`Required: ${building_price}`)*/
            }
            }
        }
    }

    async function getcookiecount(){
        const cookiecount = await page.textContent("//div[@id='cookies']")
       //for debugging console.log(cookiecount)
        const cookiearray = cookiecount.split(" ")
        const cookies = parse(cookiearray[0].toUpperCase())
        return cookies
    }

    async function getbuildingprice(building){
        var building_price = await page.textContent(`(//span[@id='productPrice${building.id}'])[1]`)
        building_price = parse(building_price.toUpperCase())
        return building_price
    }

   
   
 await decidebuildings()
    
})();