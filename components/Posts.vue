<template>
  <main class="page">
    <slot name="top" />

    <div class="content default">
      <div v-for="post in posts">
        <h2>
          <router-link :to="post.path">{{post.frontmatter.title}}</router-link>
        </h2>
        <p>{{post.frontmatter.description}}</p>
        <p>
          <router-link :to="post.path">Read more</router-link>
        </p>
      </div>
    </div>

    <footer class="page-edit">
      <div class="edit-link"
        v-if="editLink">
        <a :href="editLink"
          target="_blank"
          rel="noopener noreferrer">{{ editLinkText }}</a>
        <OutboundLink />
      </div>

      <div class="last-updated"
        v-if="lastUpdated">
        <span class="prefix">{{ lastUpdatedText }}: </span>
        <span class="time">{{ lastUpdated }}</span>
      </div>
    </footer>

    <!-- <div class="page-nav"
      v-if="prev || next">
      <p class="inner">
        <span v-if="prev"
          class="prev">
          ←
          <router-link v-if="prev"
            class="prev"
            :to="prev.path">
            {{ prev.title || prev.path }}
          </router-link>
        </span>

        <span v-if="next"
          class="next">
          <router-link v-if="next"
            :to="next.path">
            {{ next.title || next.path }}
          </router-link>
          →
        </span>
      </p>
    </div> -->

    <slot name="bottom" />
  </main>
</template>

<script>
export default {
  props: ["sidebarItems", "tag", "category"],

  computed: {
    posts() {
      return this.$site.pages
        .filter(
          x =>
            x.path.startsWith("/blog/") &&
            !x.frontmatter.blog_index &&
            (this.tag == null || x.tags.includes(this.tag)) &&
            (this.category == null || x.categories.includes(this.tag))
        )
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );
    }
  },

  methods: {}
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block

.page-edit
  @extend $wrapper
  padding-top 1rem
  padding-bottom 1rem
  overflow auto

  .edit-link
    display inline-block

    a
      color lighten($textColor, 25%)
      margin-right 0.25rem

  .last-updated
    float right
    font-size 0.9em

    .prefix
      font-weight 500
      color lighten($textColor, 25%)

    .time
      font-weight 400
      color #aaa

.page-nav
  @extend $wrapper
  padding-top 1rem
  padding-bottom 0

  .inner
    min-height 2rem
    margin-top 0
    border-top 1px solid $borderColor
    padding-top 1rem
    overflow auto // clear float

  .next
    float right

@media (max-width: $MQMobile)
  .page-edit
    .edit-link
      margin-bottom 0.5rem

    .last-updated
      font-size 0.8em
      float none
      text-align left
</style>
