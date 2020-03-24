<div class="cubebox-tmpl-wrap">
  {{#if loading}}
    <div class="loading"></div>
  {{/if}}

  <div class="carousel-box">
    <cube-carousel
      list="{{carouselList}}"
      slot="{{carouselTpl}}"
      width="368"
      height="100">
    </cube-carousel>
  </div>

  <div class="infor-box">
    <ul>
      {{#list textList as item by item_index}}
      <li class="infor-item">
        <a href="{{item.url}}" target="_blank">{{item.title}}</a>
      </li>
      {{/list}}
    </ul>
  </div>
</div>