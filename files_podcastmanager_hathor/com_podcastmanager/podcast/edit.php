<?php
/**
 * Podcast Manager for Joomla!
 *
 * @package     PodcastManager
 * @subpackage  files_podcastmanager_hathor
 *
 * @copyright   Copyright (C) 2011-2014 Michael Babker. All rights reserved.
 * @license     GNU/GPL - http://www.gnu.org/copyleft/gpl.html
 *
 * Podcast Manager is based upon the ideas found in Podcast Suite created by Joe LeBlanc
 * Original copyright (c) 2005 - 2008 Joseph L. LeBlanc and released under the GPLv2 license
 */

defined('_JEXEC') or die;

JHtml::addIncludePath(JPATH_COMPONENT . '/helpers/html');
JHtml::_('behavior.tooltip');
JHtml::_('behavior.formvalidation');
?>
<script type="text/javascript">
	Joomla.submitbutton = function(task)
	{
		if (task == 'podcast.cancel' || document.formvalidator.isValid(document.id('item-form'))) {
			Joomla.submitform(task, document.getElementById('item-form'));
		}
	}
</script>

<div class="podcast-edit">
	<form action="<?php echo JRoute::_('index.php?option=com_podcastmanager&view=podcast&layout=edit&id=' . (int) $this->item->id); ?>" method="post" name="adminForm" id="item-form" class="form-validate">
		<div class="col main-section">
			<fieldset class="adminform">
				<legend><?php echo JText::_('COM_PODCASTMANAGER_VIEW_PODCAST_FIELDSET_METADATA'); ?></legend>
				<ul class="adminformlist">
					<li><?php echo $this->form->getLabel('filename');
						echo $this->form->getInput('filename'); ?>
					</li>

					<li><?php echo $this->form->getLabel('title');
						echo $this->form->getInput('title'); ?>
					</li>

					<li><?php echo $this->form->getLabel('alias');
						echo $this->form->getInput('alias'); ?>
					</li>

					<li><?php echo $this->form->getLabel('feedname');
						echo $this->form->getInput('feedname'); ?>
					</li>

					<li><?php echo $this->form->getLabel('published');
						echo $this->form->getInput('published'); ?>
					</li>

					<li><?php echo $this->form->getLabel('mime');
						echo $this->form->getInput('mime'); ?>
					</li>

					<li><?php echo $this->form->getLabel('itSummary');
						echo $this->form->getInput('itSummary'); ?>
					</li>

					<li><?php echo $this->form->getLabel('itImage');
						echo $this->form->getInput('itImage'); ?>
					</li>

					<li><?php echo $this->form->getLabel('itAuthor');
						echo $this->form->getInput('itAuthor'); ?>
					</li>

					<li><?php echo $this->form->getLabel('itBlock');
						echo $this->form->getInput('itBlock'); ?>
					</li>

					<li><?php echo $this->form->getLabel('itDuration');
						echo $this->form->getInput('itDuration'); ?>
					</li>

					<li><?php echo $this->form->getLabel('itExplicit');
						echo $this->form->getInput('itExplicit'); ?>
					</li>

					<li><?php echo $this->form->getLabel('itKeywords');
						echo $this->form->getInput('itKeywords'); ?>
					</li>

					<li><?php echo $this->form->getLabel('itSubtitle');
						echo $this->form->getInput('itSubtitle'); ?>
					</li>

					<li><?php echo $this->form->getLabel('language');
						echo $this->form->getInput('language'); ?>
					</li>

					<?php if (version_compare(JVERSION, '3.1', 'ge')) : ?>
						<?php foreach ($this->form->getFieldset('jmetadata') as $field) : ?>
							<li><?php echo $field->label; ?>
								<?php echo $field->input; ?></li>
						<?php endforeach ?>
					<?php endif; ?>

					<?php if (version_compare(JVERSION, '3.2', 'ge')) : ?>
						<li><?php echo $this->form->getLabel('version_note'); ?>
						<?php echo $this->form->getInput('version_note'); ?></li>
					<?php endif; ?>

					<li><?php echo $this->form->getLabel('id');
						echo $this->form->getInput('id'); ?>
					</li>
				</ul>
			</fieldset>
		</div>

		<div class="col options-section">
			<?php echo JHtml::_('sliders.start', 'podcastmanager-podcast-sliders-' . $this->item->id);
			echo JHtml::_('sliders.panel', JText::_('JGLOBAL_FIELDSET_PUBLISHING'), 'publishing-details'); ?>
			<fieldset class="panelform">
				<legend class="element-invisible"><?php echo JText::_('JGLOBAL_FIELDSET_PUBLISHING'); ?></legend>
				<ul class="adminformlist">

					<li><?php echo $this->form->getLabel('created');
						echo $this->form->getInput('created'); ?>
					</li>

					<li><?php echo $this->form->getLabel('created_by');
						echo $this->form->getInput('created_by'); ?>
					</li>

					<li><?php echo $this->form->getLabel('publish_up');
						echo $this->form->getInput('publish_up'); ?>
					</li>

					<?php if ($this->item->modified_by)
					{ ?>
					<li><?php echo $this->form->getLabel('modified_by');
						echo $this->form->getInput('modified_by'); ?>
					</li>

					<li><?php echo $this->form->getLabel('modified');
						echo $this->form->getInput('modified'); ?>
					</li>
					<?php } ?>
				</ul>
			</fieldset>

			<?php echo JHtml::_('sliders.end'); ?>
		</div>
		<div class="clr"></div>

		<input type="hidden" name="task" value="" />
		<?php echo JHtml::_('form.token'); ?>
	</form>
</div>

