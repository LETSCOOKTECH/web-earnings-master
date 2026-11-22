// Keep schema truthful. Validate against actual visible page content and Google's supported rich result types.
export function webApplicationSchema(input:{name:string;url:string;description:string;free:boolean}){
 const u=new URL(input.url);if(u.protocol!=='https:')throw new Error('HTTPS canonical URL required');
 return { '@context':'https://schema.org', '@type':'WebApplication', name:input.name,
  url:u.href, description:input.description, applicationCategory:'UtilitiesApplication',
  offers:{'@type':'Offer',price:input.free?'0':undefined,priceCurrency:input.free?'USD':undefined}}
}
